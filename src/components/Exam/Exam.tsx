import { Container, Stack, Button, Typography, Card } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from 'react';
import { cn } from '@/themes/utils';
import { Exam, Question, TypeEnum, User, UserExam } from '@/app/api/models';
import AnswerContent from './Answer/AnswerContent';
import { useAuth } from '@/provider/AuthContext';
import QuestionContent from './QuestionContent';
import useQuery from '@/hooks/useQuery';
import { createUserExam, getExam, getUserExam } from '@/app/api';
import {
    AnswerCollection,
    AnsweredQuestionIds,
    OrderCalcAnswer,
} from '@/app/api/types';

export function Quiz({ exam_id }: { exam_id?: string }) {
    const { user } = useAuth();
    const query = useQuery();
    console.log(user, query.get('user_exam'));
    const [exam, setExam] = useState<Exam | null>(null);
    const [answers, setAnswers] = useState<AnswerCollection>({});
    const [result, setResult] = useState<UserExam | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(1 * 60); // 90min in sec
    const [isRunning, setIsRunning] = useState(true); // Timer is running by default

    useEffect(() => {
        if (!exam_id) return;
        getExam(parseInt(exam_id))
            .then((response) => setExam(response))
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

    useEffect(() => {
        if (isRunning && timeLeft > 0 && result === null) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isRunning, timeLeft, result]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft]);

    if (exam === null) {
        return <>Loading...</>;
    }
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleSubmit = async () => {
        setIsRunning(false);
        let answered_questions_ids = [] as AnsweredQuestionIds[];
        if (Object.keys(answers).length > 0) {
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
            setAnswers((prevAnswers) => {
                const currentAnswers =
                    (prevAnswers[question.id] as number[]) || [];
                if (currentAnswers.includes(answerId)) {
                    return {
                        ...prevAnswers,
                        [question.id]: currentAnswers.filter(
                            (ans) => ans !== answerId
                        ),
                    };
                }
                return {
                    ...prevAnswers,
                    [question.id]: [...currentAnswers, answerId],
                };
            });
        }
        if (
            question.type === TypeEnum.ordering ||
            question.type === TypeEnum.calculation
        ) {
            setAnswers((prevAnswers) => {
                const currentAnswers =
                    (prevAnswers[question.id] as OrderCalcAnswer) || {};
                if (Object.keys(currentAnswers).includes(answerId.toString())) {
                    return prevAnswers;
                } else {
                    const answerPair = {} as OrderCalcAnswer;
                    answerPair[answerId] = answerText ?? '';
                    return {
                        ...prevAnswers,
                        [question.id]: { ...currentAnswers, ...answerPair },
                    };
                }
            });
        }
    };
    const currentQuestion = exam?.questions[currentQuestionIndex];

    console.log(exam);
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
                            Testergebnis: {result.score}/ {result.score_total}
                        </Typography>
                    ) : (
                        <Typography
                            textAlign="center"
                            className="!mb-4"
                            variant="h3"
                        >
                            verbleibende Zeit: {formatTime(timeLeft)}
                        </Typography>
                    )}
                    <Card
                        className="mb-4 shadow-md py-5"
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
                        />
                    </Card>
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
                                setCurrentQuestionIndex(
                                    currentQuestionIndex - 1
                                )
                            }
                        >
                            Zurück
                        </Button>
                        {currentQuestionIndex === exam.questions.length - 1 ? (
                            result ? (
                                <Button
                                    className="!text-white"
                                    variant="contained"
                                    disabled
                                >
                                    Weiter
                                </Button>
                            ) : (
                                <Button
                                    className="!text-white"
                                    variant="contained"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Absenden
                                </Button>
                            )
                        ) : (
                            <Button
                                variant="contained"
                                className="!text-white"
                                onClick={() =>
                                    setCurrentQuestionIndex(
                                        currentQuestionIndex + 1
                                    )
                                }
                            >
                                Weiter
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
                                {Object.keys(answers).includes(
                                    q.id.toString()
                                ) && (
                                    <CheckCircleIcon className="absolute right-[-10px] top-[-10px] text-zinc-400 !w-[18px]" />
                                )}
                                {idx + 1}
                            </span>
                        ))}
                    </Stack>
                </Container>
            )}
        </>
    );
}
