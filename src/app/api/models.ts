export interface Answer {
    id: number;
    created_at: Date;
    answer: string;
    correct: boolean;
    correct_order: number | null;
    points: number;
    question: Question;
    question_id: number;
}
export enum TypeEnum {
    multiple_choice = 'multiple_choice',
    ordering = 'ordering',
    calculation = 'calculation',
}

export interface Question {
    id: number;
    created_at: Date;
    title: string;
    question: string;
    points: number;
    type: TypeEnum;
    situation: string | null;
    hint: string | null;
    solution_hint: string | null;
    answers: Answer[];
    answer_id: number;
    exam: Exam;
    exam_id: number;
}

export interface Exam {
    id: number;
    created_at: Date;
    title: string;
    score: number;
    questions: Question[];
    question_id: number;
    google_drive_link: string | null;
}

export interface User {
    id: number;
    username: string;
    email: string;
    is_paying: boolean;
    stripe_customer_id: string;
    user_exams: UserExam[];
    login_attempts: number;
    locked: boolean;
}

export interface UserExam {
    id: number;
    created_at: Date;
    title: string;
    score: number;
    score_total: number;
    selected_answer_ids: number[];
    ordered_answer_pairs: { [answerId: string]: string };
}

export interface StripeProduct {
    product_id: string;
    product_name: string;
    product_description: string;
    unit_amount: number;
    lookup_key: string;
    type: string;
    recurring: {
        interval: string;
    } | null;
}
