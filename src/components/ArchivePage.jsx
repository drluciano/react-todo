import { useContext } from "react";
import { ArchiveContext } from "../context/ArchiveContext.jsx";

const ArchivePage = () => {
  const { archive, setArchive } = useContext(ArchiveContext);

  if (archive)
    return (
      <div className={"flex flex-col gap-2 w-screen px-20"}>
        <h1 className={"text-2xl font-bold"}>Archived Todos</h1>
        <div className={"border-b border-gray-300"} />
        {archive.map((item, index) => (
          <div key={index} className={"flex flex-row justify-between"}>
            <p className={""}>
              <span className={"font-bold"}>{index + 1}. </span>
              {item.text}
            </p>
            <div>
              <p>
                Created by{" "}
                <span className={"font-bold"}>{item.currentUser}</span>
              </p>
              <p>
                Archived by{" "}
                <span className={"font-bold"}>{item.archivedBy}</span>{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
};

export default ArchivePage;
