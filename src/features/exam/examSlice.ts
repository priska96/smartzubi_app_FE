import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface SelectedAnswer {
    questions: {
        [ids: string | number]: { [id: string]: boolean };
    };
}
interface ExamState {
    examResult: SelectedAnswer;
}

interface SelectedAnswerPayload {
    questionId: string | number;
    answerIds: { [id: string | number]: boolean };
}
// Define the initial state using that type
const initialState: ExamState = {
    examResult: { questions: {} },
};

export const examSlice = createSlice({
    name: 'exam',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        selectAnswer: (state, action: PayloadAction<SelectedAnswerPayload>) => {
            state.examResult.questions[action.payload.questionId] =
                action.payload.answerIds;
        },
    },
});

export const { selectAnswer } = examSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default examSlice.reducer;
