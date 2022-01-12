class MathQuestions {
    static multiply(set, questions, start,end) {
        for (let i = 0; i < set.length; i++) {
            for (let j = start; j <= end; j++) {
                let q = { q: ((set[i]) + " X " + j), a: String(j * set[i]) };
                questions.push(q);
            }
        }
        return questions;
    }

    static divide(set, questions,start,end) {
        for (let i = 0; i < set.length; i++) {
            for (let j = start; j <= end; j++) {
                let q = { q: ((set[i] * j) + " ÷ " + set[i]), a: String(j) };
                questions.push(q);
            }
        }
        return questions;
    }

    static add(set, questions, start, end) {
        for (let i = 0; i < set.length; i++) {
            for (let j = start; j <= end; j++) {
                let q = { q: ((set[i]) + " + " + j), a: String(set[i] + j) };
                questions.push(q);
            }
        }
        return questions;
    }

    static subtract(set, questions,start,end) {
        for (let i = 0; i < set.length; i++) {
            for (let j = start; j <= end; j++) {
                let q = { q: (set[i] + j + " - " + (set[i])), a: String(j) };
                questions.push(q);
            }
        }
        return questions;
    }
    static combo(set,type, questions,start,end){
        // type 1=add/subtract, 2=multiply/divide, 3=all
        if(type==1){
            questions = MathQuestions.add(set,questions,start,end);
            questions = MathQuestions.subtract(set,questions,start,end);
        }
        else if(type==2){
            questions = MathQuestions.multiply(set,questions,start,end);
            questions = MathQuestions.divide(set,questions,start,end);
        }else{
            questions = MathQuestions.add(set,questions,start,end);
            questions = MathQuestions.subtract(set,questions,start,end);
            questions = MathQuestions.multiply(set,questions,start,end);
            questions = MathQuestions.divide(set,questions,start,end);
        }
        return questions;
    }
    static debug(questions){
        for(let i=0;i < questions.length;i++){
            console.log(questions[i].q+" "+questions[i].a);
        }
    }
}