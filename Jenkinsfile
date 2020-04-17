pipeline {
    agent {
        label 'builder'
    }
    options {
        timeout(time: 1, unit: 'HOURS') 
    }
    stages {
        try {
            stage('NodeJS Latest') {
                agent {
                    docker { image 'node:latest' }
                }
                steps {
                    sh 'node --version'
                    sh 'uname -a'
                }
            }
        } catch (Exception e) {
            echo "Stage failed; others may continue."  
        }
        try {
            stage('NodeJS Current') {
                agent {
                    docker { image 'node:current' }
                }
                steps {
                    sh 'node --version'
                    sh 'uname -a'
                }
            }
        } catch (Exception e) {
            echo "Stage failed; others may continue."  
        }
        try {
            stage('NodeJS LTS') {
                agent {
                    docker { image 'node:lts' }
                }
                steps {
                    sh 'node --version'
                    sh 'uname -a'
                }
            }
        } catch (Exception e) {
            echo "Stage failed; others may continue."  
        }
        try {
            stage('NodeJS LTS Alpine') {
                agent {
                    docker { image 'node:lts-alpine' }
                }
                steps {
                    sh 'node --version'
                    sh 'uname -a'
                }
            }
        } catch (Exception e) {
            echo "Stage failed; others may continue."  
        }
    }
}
