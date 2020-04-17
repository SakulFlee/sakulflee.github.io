pipeline {
    stages {
        stage('NodeJS Latest') {
            agent {
                docker { image 'node:latest' }
            }
            steps {
                sh 'node --version'
                sh 'uname -a'
            }
        }
        stage('NodeJS Current') {
            agent {
                docker { image 'node:current' }
            }
            steps {
                sh 'node --version'
                sh 'uname -a'
            }
        }
        stage('NodeJS LTS') {
            agent {
                docker { image 'node:lts' }
            }
            steps {
                sh 'node --version'
                sh 'uname -a'
            }
        }
        stage('NodeJS LTS Alpine') {
            agent {
                docker { image 'node:lts-alpine' }
            }
            steps {
                sh 'node --version'
                sh 'uname -a'
            }
        }
    }
}
