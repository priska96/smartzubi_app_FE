import { AnswerCollection } from '@/app/api/types';

export const setMCAnswers = (
    prevAnswers: AnswerCollection,
    question_id: number,
    answerId: number
) => {
    const currentAnswers = (prevAnswers[question_id] as number[]) || [];
    if (currentAnswers.includes(answerId)) {
        return {
            ...prevAnswers,
            [question_id]: currentAnswers.filter((ans) => ans !== answerId),
        };
    }
    return {
        ...prevAnswers,
        [question_id]: [...currentAnswers, answerId],
    };
};
