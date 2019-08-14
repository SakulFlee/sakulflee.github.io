use std::process::Command;

fn main() {
    if cfg!(target_os = "windows") {
        panic!("Building on windows is not yet supported!");
    }

    Command::new("sh")
        .arg("-c")
        .arg("./build.sh")
        .output()
        .expect("failed to run build script");
}