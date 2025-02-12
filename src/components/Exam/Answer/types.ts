import { Question, UserExam } from '@/app/api/models';
import { AnswerCollection } from '@/app/api/types';

export interface AnswerContentProps {
    currentQuestion: Question;
    answers: AnswerCollection;
    handleChange: (
        question: Question,
        answerId: number,
        answerText?: string
    ) => void;
    result: UserExam | null;
    disabled?: boolean;
}
