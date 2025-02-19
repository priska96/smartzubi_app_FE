import { Exam } from '@/app/api/models';
import { apiAuth } from './axiosInstance';

export const getExams = async (): Promise<Exam[]> => {
    try {
        const response = await apiAuth.get(`/api/exam`);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const getExam = async (exam_id: number): Promise<Exam> => {
    try {
        const response = await apiAuth.get(`/api/exam/${exam_id}`);
        return response.data;
    } catch (e) {
        throw e;
    }
};
