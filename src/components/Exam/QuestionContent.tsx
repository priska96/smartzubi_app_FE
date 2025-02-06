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

export default function QuestionContent(props: {
    question: Question;
    hasResult: boolean;
}) {
    return (
        <Container>
            <Typography className="!mb-4" textAlign="center" variant="h2">
                {props.question.title}
            </Typography>
            <Typography>
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
                        Situation
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
                        Hinweis
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
                        Lösungshinweis
                    </AccordionSummary>
                    <AccordionDetails className="whitespace-pre-line">
                        <Latex>{props.question.solution_hint}</Latex>
                    </AccordionDetails>
                </Accordion>
            )}
        </Container>
    );
}
