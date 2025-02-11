import { TypeEnum } from '@/app/api/models';
import { AnswerCollection, AnsweredQuestionIds } from '@/app/api/types';

export const generateAnswerIds = (answers: AnswerCollection) => {
    let answered_questions_ids = [] as AnsweredQuestionIds[];
    answered_questions_ids = Object.keys(answers).map((qId) => {
        const questionId = parseInt(qId);
        if (!Array.isArray(answers[questionId])) {
            if (Object.keys(answers[questionId]).length === 1) {
                return {
                    question_id: questionId,
                    answer_pair: answers[questionId],
                    answer_ids: null,
                    type: TypeEnum.calculation,
                };
            }
            return {
                question_id: questionId,
                answer_pair: answers[questionId],
                answer_ids: null,
                type: TypeEnum.ordering,
            };
        }
        return {
            question_id: questionId,
            answer_ids: answers[questionId],
            answer_pair: null,
            type: TypeEnum.multiple_choice,
        };
    });
    return answered_questions_ids;
};
