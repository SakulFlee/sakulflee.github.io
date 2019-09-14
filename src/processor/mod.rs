use crate::application_context::ApplicationContext;

pub trait Processor {
    fn process(&self, ctx: &ApplicationContext, out_path: &String, content: &String);
}

mod html_processor;
mod copy_processor;
mod css_processor;

pub use html_processor::*;
pub use copy_processor::*;
pub use css_processor::*;