import { useContext } from "react";
import { ArchiveContext } from "../context/ArchiveContext.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const ArchivePage = () => {
  const { archive } = useContext(ArchiveContext);

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl">
      <h1 className="text-2xl font-bold">Archived Todos</h1>
      <Separator />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Archived By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {archive.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold">{index + 1}</TableCell>
              <TableCell>{item.text}</TableCell>
              <TableCell>{item.currentUser}</TableCell>
              <TableCell>{item.archivedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArchivePage;
