import ListTable from "./ListTable";

const ViewList = ({ listName, id }) => {
  return (
    <main className="font-inter">
      <ListTable id={id} listName={listName} />
    </main>
  );
};

export default ViewList;
