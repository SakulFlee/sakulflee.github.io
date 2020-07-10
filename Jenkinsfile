pipeline {
    agent {
        label 'docker'
    }
    options {
        timeout(time: 1, unit: 'HOURS') 
    }
    stages {
        stage('Check') {
            agent {
                docker { 
                    label 'docker'
                    image 'rust:latest' 
                }
            }
            steps {
                sh 'cargo check'
            }
        }
        stage('Build') {
            agent {
                docker { 
                    label 'docker'
                    image 'rust:latest' 
                }
            }
            steps {
                sh 'cargo build'
            }
        }
        stage('Build Docs') {
            agent {
                docker { 
                    label 'docker'
                    image 'rust:latest' 
                }
            }
            steps {
                sh 'cargo doc'
            }
        }
        stage('Test') {
            agent {
                docker { 
                    label 'docker'
                    image 'rust:latest' 
                }
            }
            steps {
                sh 'cargo test'
            }
        }
    }
}
