import LecturesPageLayout from "../components/LecturesLayout";
import { Table, TableBody, TableCell,  TableRow } from '../components/table';
import { Heading} from '../components/heading';


export default function LecturesPage() {


    console.log("Patirnce");


    return( <LecturesPageLayout>
        <Heading className={"text-[0.97rem]"}>Upcomming Lectures</Heading>
        <Table  className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
            <TableBody>


            </TableBody>
        </Table>
    </LecturesPageLayout>
    )

}