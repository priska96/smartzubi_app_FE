import { Question } from '@/app/api/models';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { useTranslation } from 'react-i18next';

export default function QuestionContent(props: {
    question: Question;
    hasResult: boolean;
}) {
    const { t } = useTranslation();
    return (
        <Container>
            <Typography className="!mb-4" textAlign="center" variant="h2">
                <span className="mr-2">{props.question.question}</span>
                <span className="font-bold">
                    ({props.question.points.toString()}Pkt.)
                </span>
            </Typography>
            {props.question.situation && (
                <Accordion className="mt-4 !bg-zinc-100">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className="!text-sky-500 font-bold"
                    >
                        {t('exams.exam.situation')}
                    </AccordionSummary>
                    <AccordionDetails className="whitespace-pre-line">
                        {props.question.situation}
                    </AccordionDetails>
                </Accordion>
            )}
            {props.question.hint && (
                <Accordion className="mt-4 !bg-zinc-100">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className="!text-sky-500 font-bold"
                    >
                        {t('exams.exam.hint')}
                    </AccordionSummary>
                    <AccordionDetails className="whitespace-pre-line">
                        {props.question.hint}
                    </AccordionDetails>
                </Accordion>
            )}
            {props.hasResult && props.question.solution_hint && (
                <Accordion className="mt-4 !bg-zinc-100">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className="!text-sky-500 font-bold"
                    >
                        {t('exams.exam.solution_hint')}
                    </AccordionSummary>
                    <AccordionDetails className="whitespace-pre-line">
                        <Latex>{props.question.solution_hint}</Latex>
                    </AccordionDetails>
                </Accordion>
            )}
        </Container>
    );
}
