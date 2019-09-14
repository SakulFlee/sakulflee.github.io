use crate::folder_configuration::FolderConfiguration;

pub struct ApplicationContext<'a> {
    pub input: FolderConfiguration<'a>,
    pub output: FolderConfiguration<'a>,
}