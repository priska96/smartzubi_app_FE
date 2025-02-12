import { FormControl, FormLabel, FormGroup, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { cn } from '@/themes/utils';
import { OrderCalcAnswer } from '@/app/api/types';
import { AnswerContentProps } from './types';

export default function OrderingAnswer({
    currentQuestion,
    answers,
    handleChange,
    result,
    disabled,
}: AnswerContentProps) {
    // console.log(answers);
    return (
        <FormControl
            className="!flex flex-1"
            sx={{ my: 3 }}
            component="fieldset"
            variant="standard"
        >
            <FormGroup className="flex container flex-col gap-y-2">
                {currentQuestion.answers.map((answer, idx) => {
                    let val = '';
                    if (
                        answers[currentQuestion.id] &&
                        (answers[currentQuestion.id] as OrderCalcAnswer)[
                            answer.id
                        ]
                    ) {
                        val = (answers[currentQuestion.id] as OrderCalcAnswer)[
                            answer.id
                        ];
                    }
                    if (result) {
                        val = result.ordered_answer_pairs[answer.id];
                        console.log(parseInt(val), answer.correct_order);
                    }
                    return (
                        <div key={idx} className="relative">
                            <div className="flex items-center gap-x-2 w-full border border-zinc-400 bg-zinc-100 rounded-lg py-4 pl-2 pr-7 !m-0">
                                <TextField
                                    sx={{
                                        flex: '0 0 40px',
                                        '.MuiInputBase-input': {
                                            padding: '8px!important',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            bgcolor: 'white',
                                        },
                                    }}
                                    className="min-w-[40px] w-[40px]"
                                    id="outlined-basic"
                                    disabled={disabled || !!result || false}
                                    label=""
                                    variant="outlined"
                                    value={val}
                                    onChange={(e) =>
                                        handleChange(
                                            currentQuestion,
                                            answer.id,
                                            e.target.value
                                        )
                                    }
                                />
                                <FormLabel
                                    component="span"
                                    className={cn(
                                        'grow-0 shrink !font-bold !text-[#C3C1BD]',
                                        result ? '' : '!text-black'
                                    )}
                                >
                                    {result && (
                                        <span className="mr-3 text-lg">
                                            [{answer.correct_order}]
                                        </span>
                                    )}
                                    {answer.answer}
                                </FormLabel>
                            </div>

                            {result &&
                                parseInt(val) === answer.correct_order && (
                                    <CheckCircleIcon className="absolute right-[8px] top-[8px] text-green-400" />
                                )}
                            {result &&
                                parseInt(val) !== answer.correct_order && (
                                    <CancelIcon className="absolute right-[8px] top-[8px] text-red-400" />
                                )}
                        </div>
                    );
                })}
            </FormGroup>
        </FormControl>
    );
}
