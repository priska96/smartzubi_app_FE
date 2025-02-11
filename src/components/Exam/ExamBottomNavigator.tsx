import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack, Button } from '@mui/material';
import { cn } from '@/themes/utils';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Exam } from '@/app/api/models';
import { AnswerCollection } from '@/app/api/types';

interface ExamBottomNavigatorProps {
    exam: Exam;
    answers: AnswerCollection;
    hasResult: boolean;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
    handleSubmit: () => Promise<void>;
}
export const ExamBottomNavigator = ({
    exam,
    hasResult,
    answers,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    handleSubmit,
}: ExamBottomNavigatorProps) => {
    const { t } = useTranslation();
    const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;
    return (
        <div>
            <Stack
                direction="row"
                justifyContent="space-between"
                className="py-3"
            >
                <Button
                    variant="contained"
                    className="!text-white"
                    disabled={currentQuestionIndex === 0}
                    onClick={() =>
                        setCurrentQuestionIndex(currentQuestionIndex - 1)
                    }
                >
                    {t('exams.exam.back_button')}
                </Button>
                {isLastQuestion ? (
                    hasResult ? (
                        <Button
                            className="!text-white"
                            variant="contained"
                            disabled
                        >
                            {t('exams.exam.next_button')}
                        </Button>
                    ) : (
                        <Button
                            className="!text-white"
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            {t('exams.exam.send_button')}
                        </Button>
                    )
                ) : (
                    <Button
                        variant="contained"
                        className="!text-white"
                        onClick={() =>
                            setCurrentQuestionIndex(currentQuestionIndex + 1)
                        }
                    >
                        {t('exams.exam.next_button')}
                    </Button>
                )}
            </Stack>
            <Stack direction="row" flexWrap="wrap" gap={1}>
                {exam?.questions.map((q, idx) => (
                    <span
                        key={idx}
                        className={cn(
                            'relative px-2 rounded-md bg-sky-500 border border-sky-500 text-white font-bold',
                            idx === currentQuestionIndex
                                ? 'bg-white text-sky-500'
                                : ''
                        )}
                        onClick={() => {
                            setCurrentQuestionIndex(idx);
                        }}
                    >
                        {Object.keys(answers).includes(q.id.toString()) && (
                            <CheckCircleIcon className="absolute right-[-10px] top-[-10px] text-zinc-400 !w-[18px]" />
                        )}
                        {idx + 1}
                    </span>
                ))}
            </Stack>
        </div>
    );
};
