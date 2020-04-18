pipeline {
    agent {
        label 'docker'
    }
    options {
        timeout(time: 1, unit: 'HOURS') 
    }
    stages {
        stage('NodeJS Latest') {
            agent {
                label 'docker'
                docker { image 'node:latest' }
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'node --version'
                    sh 'uname -a'
                }
            }
        }
        stage('NodeJS Current') {
            agent {
                label 'docker'
                docker { image 'node:current' }
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'node --version'
                    sh 'uname -a'
                }
            }
        }
        stage('NodeJS LTS') {
            agent {
                label 'docker'
                docker { image 'node:lts' }
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'node --version'
                    sh 'uname -a'
                }
            }
        }
        stage('NodeJS LTS Alpine') {
            agent {
                label 'docker'
                docker { image 'node:lts-alpine' }
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'node --version'
                    sh 'uname -a'
                }
            }
        }
    }
}
