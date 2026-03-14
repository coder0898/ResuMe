const TableHead = ({ heading }) => {
  return (
    <>
      <thead className="bg-blue-600 text-white uppercase text-xs">
        <tr>
          {heading.map((head) => (
            <th key={head} className="px-4 py-3">
              {head}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
