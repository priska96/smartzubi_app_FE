import {
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { cn } from '@/themes/utils';
import { AnswerContentProps } from './types';

export function MultipleChoiceAnswer({
    currentQuestion,
    answers,
    handleChange,
    result,
    disabled,
}: AnswerContentProps) {
    const defaultStyle =
        'w-full border border-zinc-400 bg-zinc-100 rounded-lg py-4 pl-2 pr-7 !m-0';
    const selectedStyle = 'border-sky-500 bg-sky-100';
    const answerLabel = {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D',
        4: 'E',
        5: 'F',
        6: 'G',
        7: 'H',
        8: 'I',
        9: 'J',
        10: 'K',
    };
    return (
        <FormControl
            className="!flex flex-1"
            sx={{ my: 3 }}
            component="fieldset"
            variant="standard"
        >
            <FormLabel component="legend">
                Waehle ein oder mehrere Antworten aus:
            </FormLabel>
            <FormGroup className="flex container flex-col gap-y-2">
                {currentQuestion.answers.map((answer, idx) => {
                    let isChecked =
                        (answers[currentQuestion.id] &&
                            (answers[currentQuestion.id] as number[]).includes(
                                answer.id
                            )) ||
                        false;
                    if (result) {
                        if (result.selected_answer_ids.includes(answer.id)) {
                            isChecked = true;
                        }
                    }
                    return (
                        <div className="relative" key={idx}>
                            <FormControlLabel
                                key={idx}
                                className={cn(
                                    defaultStyle,
                                    isChecked ? selectedStyle : ''
                                )}
                                control={
                                    <Checkbox
                                        disabled={disabled || !!result || false}
                                        name={`question-${currentQuestion.id}`}
                                        value={answer.id}
                                        checked={isChecked}
                                        onChange={() =>
                                            handleChange(
                                                currentQuestion,
                                                answer.id
                                            )
                                        }
                                        icon={
                                            <span className="px-2 border border-zinc-500 rounded-md bg-white text-black font-bold">
                                                {
                                                    answerLabel[
                                                        idx as keyof typeof answerLabel
                                                    ]
                                                }
                                            </span>
                                        }
                                        checkedIcon={
                                            <span className="px-2 border border-sky-500 rounded-md bg-sky-500 text-white font-bold">
                                                {
                                                    answerLabel[
                                                        idx as keyof typeof answerLabel
                                                    ]
                                                }
                                            </span>
                                        }
                                    />
                                }
                                label={
                                    <span className="font-bold">
                                        {answer.answer}
                                    </span>
                                }
                            />
                            {result && answer.correct && (
                                <CheckCircleIcon className="absolute right-[8px] top-[8px] text-green-400" />
                            )}
                            {result &&
                                !answer.correct &&
                                result.selected_answer_ids.includes(
                                    answer.id
                                ) && (
                                    <CancelIcon className="absolute right-[8px] top-[8px] text-red-400" />
                                )}
                        </div>
                    );
                })}
            </FormGroup>
        </FormControl>
    );
}
