import { Container } from '@mui/material';
import { TypeEnum } from '@/app/api/models';
import { MultipleChoiceAnswer } from './MultipleChoiceAnswer';
import OrderingAnswer from './OrderingAnswer';
import CalculationAnswer from './CalculationAnswer';
import { AnswerContentProps } from './types';

export default function AnswerContent({
    currentQuestion,
    answers,
    handleChange,
    result,
}: AnswerContentProps) {
    // console.log(answers);
    return (
        <Container className="flex">
            {currentQuestion.type === TypeEnum.multiple_choice && (
                <MultipleChoiceAnswer
                    currentQuestion={currentQuestion}
                    answers={answers}
                    handleChange={handleChange}
                    result={result}
                />
            )}
            {currentQuestion.type === TypeEnum.ordering && (
                <OrderingAnswer
                    currentQuestion={currentQuestion}
                    answers={answers}
                    handleChange={handleChange}
                    result={result}
                />
            )}
            {currentQuestion.type === TypeEnum.calculation && (
                <CalculationAnswer
                    currentQuestion={currentQuestion}
                    answers={answers}
                    handleChange={handleChange}
                    result={result}
                />
            )}
        </Container>
    );
}
