import { Container, Button, Typography, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { Exam, Question, TypeEnum, User, UserExam } from '@/app/api/models';
import AnswerContent from './Answer/AnswerContent';
import useQuery from '@/hooks/useQuery';
import QuestionContent from './QuestionContent';
import { createUserExam, getExam, getUserExam } from '@/app/api';
import { AnswerCollection, AnsweredQuestionIds } from '@/app/api/types';
import ChatBot from '../ChatBot/ChatBot';
import { useAuthUser } from '@/features/authentication/hooks';
import { useChatBotStore } from '@/store';
import { useTranslation } from 'react-i18next';
import { generateAnswerIds, setMCAnswers, setOrderCalcAnswers } from './utils';
import { ExamBottomNavigator } from './ExamBottomNavigator';
import { Timer } from './Timer';

export function Quiz({ exam_id }: { exam_id?: string }) {
    const { t } = useTranslation();
    const user = useAuthUser();
    const { initializeChatRoom } = useChatBotStore();

    const query = useQuery();
    // console.log(user, query.get('user_exam'));
    const [exam, setExam] = useState<Exam | null>(null);
    const [answers, setAnswers] = useState<AnswerCollection>({});
    const [result, setResult] = useState<UserExam | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20 * 60); // 20min in sec
    const [isRunning, setIsRunning] = useState(false); // Timer is running by default

    useEffect(() => {
        if (!exam_id) return;
        getExam(parseInt(exam_id))
            .then((response) => {
                setExam(response);
                initializeChatRoom(response.id, (user as User).id);
            })
            .catch((error) => console.log(error));
    }, [exam_id]);

    useEffect(() => {
        const user_exam_id = query.get('user_exam');
        if (user_exam_id) {
            getUserExam((user as User).id, parseInt(user_exam_id))
                .then((response) => setResult(response))
                .catch((error) => console.log(error));
        }
    }, [query, user]);

    useEffect(
        () => {
            if (timeLeft === 0) {
                const submitForm = async () => {
                    try {
                        await handleSubmit();
                    } catch (error) {
                        console.error('Error in handleSubmit:', error);
                    }
                };
                submitForm();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [timeLeft]
    );

    if (exam === null) {
        return <>Loading...</>;
    }

    const handleSubmit = async () => {
        setIsRunning(false);
        let answered_questions_ids = [] as AnsweredQuestionIds[];
        if (Object.keys(answers).length > 0) {
            answered_questions_ids = generateAnswerIds(answers);
        }
        try {
            const res = await createUserExam({
                user_id: (user as User).id,
                exam_id: exam.id,
                title: exam.title,
                answered_questions_ids,
            });
            setResult(res);
            setCurrentQuestionIndex(0);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (
        question: Question,
        answerId: number,
        answerText?: string
    ) => {
        if (question.type === TypeEnum.multiple_choice) {
            setAnswers((prevAnswers) =>
                setMCAnswers(prevAnswers, question.id, answerId)
            );
        }
        if (
            question.type === TypeEnum.ordering ||
            question.type === TypeEnum.calculation
        ) {
            setAnswers((prevAnswers) =>
                setOrderCalcAnswers(
                    prevAnswers,
                    question.id,
                    answerId,
                    answerText
                )
            );
        }
    };
    const currentQuestion = exam?.questions[currentQuestionIndex];

    // console.log(exam);
    return (
        <>
            {exam && (
                <Container
                    sx={{
                        paddingX: 0,
                        '@media (min-width: 380px)': {
                            paddingX: 2,
                        },
                    }}
                >
                    {result ? (
                        <Typography
                            textAlign="center"
                            className="!mb-4"
                            variant="h3"
                        >
                            {t('exams.exam.score')}: {result.score}/{' '}
                            {result.score_total}
                        </Typography>
                    ) : isRunning ? (
                        <Timer
                            timeLeft={timeLeft}
                            isRunning={isRunning}
                            hasResult={!!result}
                            setTimeLeft={setTimeLeft}
                        />
                    ) : (
                        <div className="flex justify-center w-full">
                            <Button
                                variant="contained"
                                className="!text-white"
                                disabled={isRunning}
                                onClick={() => setIsRunning(true)}
                            >
                                {t('exams.exam.start_button')}
                            </Button>
                        </div>
                    )}
                    <Card
                        className="mb-4 shadow-md py-5 relative"
                        key={currentQuestionIndex}
                    >
                        <QuestionContent
                            question={currentQuestion}
                            hasResult={!!result}
                        />
                        <AnswerContent
                            currentQuestion={currentQuestion}
                            answers={answers}
                            handleChange={handleChange}
                            result={result}
                            disabled={!isRunning}
                        />
                        <ChatBot exam={exam} />
                    </Card>
                    <ExamBottomNavigator
                        exam={exam}
                        hasResult={Boolean(result)}
                        answers={answers}
                        currentQuestionIndex={currentQuestionIndex}
                        setCurrentQuestionIndex={setCurrentQuestionIndex}
                        handleSubmit={handleSubmit}
                        disabled={!isRunning}
                    />
                </Container>
            )}
        </>
    );
}
