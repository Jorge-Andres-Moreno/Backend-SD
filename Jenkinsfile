node {
    checkout scm

    stage('install'){
        def node = 'Node'
        nodejs(node){
            sh 'npm install'
        }
    }

    stage('test'){
        def node = 'NodeJS'
        nodejs(node){
            sh 'npm test'
        }
    }
}