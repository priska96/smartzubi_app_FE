import { TypeEnum } from './models';

export type RegisterReqData = {
    username: string;
    email: string;
    password: string;
};
export type RegisterResData = {
    user_id: number;
};
export type LoginReqData = {
    email: string;
    password: string;
};
export type LoginResData = {
    access_token: string;
    refresh_token: string;
    user_id: number;
};
export type TokenRefreshReqData = {
    refreshToken: string;
    accessToken: string;
    user_id: number;
};
export type TokenRefreshResData = {
    access_token: string;
};
export type AnswerCollection = {
    [key: number]: number[] | OrderCalcAnswer;
};
export type OrderCalcAnswer = {
    [key: number]: string;
};

export type AnsweredQuestionIds = {
    question_id: number;
    answer_pair: AnswerCollection | null;
    answer_ids: number[] | null;
    type: TypeEnum;
};

export type CreateUserExamReqData = {
    user_id: number | string;
    exam_id: number | string;
    title: string;
    answered_questions_ids: AnsweredQuestionIds[];
};
