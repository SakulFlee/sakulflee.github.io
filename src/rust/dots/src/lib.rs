mod utils;
use crate::utils::set_panic_hook;

extern crate web_sys;
extern crate js_sys;

use std::f64;
use std::cell::RefCell;
use std::rc::Rc;

use wasm_bindgen::{prelude::*, JsCast};
use web_sys::{HtmlCanvasElement, CanvasRenderingContext2d, Document, console, Window};
use js_sys::Math::random;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

fn request_animation_frame(window: &Window, f: &Closure<dyn FnMut()>) {
    window
        .request_animation_frame(f.as_ref().unchecked_ref())
        .expect("should register `requestAnimationFrame`");
}

const FPS: f64 = 120f64;
const MAX_RGB: f64 = 255f64;

struct Dot {
    position: (f64, f64),
    velocity: (f64, f64),
}

impl Dot {
    fn dist(&self, other: &Dot) -> f64 {
        let dx = if other.position.0 > self.position.0 { other.position.0 - self.position.0 } else { self.position.0 - other.position.0 };
        let dy = if other.position.1 > self.position.1 { other.position.1 - self.position.1 } else { self.position.1 - other.position.1 };
        return (dx.powf(2f64) + dy.powf(2f64)).sqrt();
    }
}

pub struct Dots {
    canvas: HtmlCanvasElement,
    context: CanvasRenderingContext2d,
    dots: Vec<Dot>,
    canvas_previous: (u32, u32),
    max_d: f64,
}

impl Dots {
    pub fn new(document: &Document) -> Dots {
        let canvas: HtmlCanvasElement = document
            .get_element_by_id("wire-frame")
            .unwrap()
            .dyn_into::<HtmlCanvasElement>()
            .map_err(|_| ())
            .unwrap();

        let context = canvas
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<CanvasRenderingContext2d>()
            .unwrap();

        let mut dots = Dots {
            canvas,
            context,
            dots: vec![],
            canvas_previous: (0, 0),
            max_d: 0f64,
        };

        dots.resize();
        dots.generate_dots();

        return dots;
    }

    fn generate_dots(&mut self) {
        let mut vec: Vec<Dot> = vec![];
        let grid_size_width = (self.canvas_previous.0 as f64 / 160f64) as u32;
        let grid_size_height = (self.canvas_previous.1 as f64 / 160f64) as u32;
        for x in 0..grid_size_width {
            for y in 0..grid_size_height {
                let mod_y = if x % 2 == 0 { 16f64 } else { 32f64 };
                let rnd_x = random() * 100.0;
                let rnd_y = random() * 100.0;
                let rnd_x_neg = random() < 0.5;
                let rnd_y_neg = random() < 0.5;

                let dot = Dot {
                    position: (
                        x as f64 * (self.canvas_previous.0 / grid_size_width) as f64 + 16f64, 
                        y as f64 * (self.canvas_previous.1 / grid_size_height) as f64 + mod_y,
                    ),
                    velocity: (
                        if rnd_x_neg { -rnd_x } else { rnd_x }, 
                        if rnd_y_neg { -rnd_y } else { rnd_y },
                    ),
                };

                vec.push(dot);
            }
        }
        self.dots = vec;
    }

    pub fn tick(&mut self) {
        self.resize();
        self.draw();
        self.update();
    }

    fn resize(&mut self) {
        let canvas_current = Dots::get_dimension_from_canvas(&self.canvas);

        if self.canvas_previous.0 != canvas_current.0 || self.canvas_previous.1 != canvas_current.1 {
            self.canvas_previous = (canvas_current.0, canvas_current.1);
            self.canvas.set_width(canvas_current.0);
            self.canvas.set_height(canvas_current.1);
            self.generate_dots();
        }
    }

    fn draw(&mut self) {
        self.context.clear_rect(0.0, 0.0, self.canvas_previous.0 as f64, self.canvas_previous.1 as f64);

        for dot0 in &self.dots {
            for dot1 in &self.dots {
                let d = dot0.dist(dot1);
                if d > self.max_d {
                    self.max_d = d;
                }
                
                if d <= 500.0 {
                    let base = MAX_RGB / self.max_d;
                    let base_dist = base * d;
                    let alpha = MAX_RGB - base_dist;

                    let r = MAX_RGB - base_dist * 4f64;
                    let g = MAX_RGB - base_dist * 4f64;
                    let b = MAX_RGB - base_dist * 4f64;

                    self.context.begin_path();
                    self.context.move_to(dot0.position.0, dot0.position.1);
                    self.context.line_to(dot1.position.0, dot1.position.1);
                    self.context.set_line_width(1f64);
                    self.context.set_stroke_style(&JsValue::from_str(&format!("rgb({}, {}, {})", r, g, b)));
                    self.context.stroke();
                }
            }
        }
    }

    fn update(&mut self) {
        for dot in &mut self.dots {
            dot.position.0 = dot.position.0 + dot.velocity.0 / FPS;
            dot.position.1 = dot.position.1 + dot.velocity.1 / FPS;

            if dot.position.0 < 0.0 {
                dot.velocity.0 = -dot.velocity.0;
                dot.position.0 = 0.0;
            }
            if dot.position.0 > self.canvas.width() as f64 {
                dot.velocity.0 = -dot.velocity.0;
                dot.position.0 = self.canvas.width() as f64;
            }
            if dot.position.1 < 0.0 {
                dot.velocity.1 = -dot.velocity.1;
                dot.position.1 = 0.0;
            }
            if dot.position.1 > self.canvas.height() as f64 {
                dot.velocity.1 = -dot.velocity.1;
                dot.position.1 = self.canvas.height() as f64;
            }
        }
    }

    fn get_dimension_from_canvas(canvas: &HtmlCanvasElement) -> (u32, u32) {
        (canvas.client_width() as u32, canvas.client_height() as u32)
    }
}

#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    set_panic_hook();

    let window = web_sys::window().expect("no global 'window' exists");
    let document = window.document().expect("should have a document in 'window'");
    let body = document.body().expect("document should have a body");

    // ---
    let mut dots = Dots::new(&document);
    let f = Rc::new(RefCell::new(None));
    let g = f.clone();
    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
        dots.tick();
        request_animation_frame(&web_sys::window().unwrap(), f.borrow().as_ref().unwrap());
    }) as Box<dyn FnMut()>));
    request_animation_frame(&window, g.borrow().as_ref().unwrap());
    // ---

    Ok(())
}
