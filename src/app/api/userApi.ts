import { api, apiAuth } from './axiosInstance';
import { UserExam } from './models';
import { CreateUserExamReqData } from './types';

export const createUserExam = async ({
    user_id,
    exam_id,
    title,
    answered_questions_ids,
}: CreateUserExamReqData) => {
    try {
        const response = await apiAuth.post(
            `/api/user/${user_id}/exam/create`,
            {
                user_id,
                exam_id,
                title,
                answered_questions: answered_questions_ids,
            }
        );
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const getUserExams = async (user_id: number): Promise<UserExam[]> => {
    try {
        const response = await apiAuth.get(`/api/user/${user_id}/exam`);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const getUserExam = async (
    user_id: number,
    user_exam_id: number
): Promise<UserExam> => {
    try {
        const response = await apiAuth.get(
            `/api/user/${user_id}/exam/${user_exam_id}`
        );
        return response.data;
    } catch (e) {
        throw e;
    }
};

export type UserPatchRequest = {
    email?: string;
    is_paying?: boolean;
    password?: string;
    stripe_customer_id?: string;
};

export const updateUser = async (user_id: number, data: UserPatchRequest) => {
    try {
        const response = await api.patch(`/api/user/${user_id}`, data);
        return response.data;
    } catch (e) {
        throw e;
    }
};
