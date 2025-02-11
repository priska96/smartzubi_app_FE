import { AnswerCollection, OrderCalcAnswer } from '@/app/api/types';

export const setOrderCalcAnswers = (
    prevAnswers: AnswerCollection,
    question_id: number,
    answerId: number,
    answerText?: string
) => {
    const currentAnswers = (prevAnswers[question_id] as OrderCalcAnswer) || {};
    if (Object.keys(currentAnswers).includes(answerId.toString())) {
        return prevAnswers;
    } else {
        const answerPair = {} as OrderCalcAnswer;
        answerPair[answerId] = answerText ?? '';
        return {
            ...prevAnswers,
            [question_id]: { ...currentAnswers, ...answerPair },
        };
    }
};
