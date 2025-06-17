const TableShimmer = () => {
  return (
    <table
      cellPadding="0"
      width="100%"
      cellSpacing="0"
      border="0"
      className="shimmerTable"
    >
      <thead>
        <tr>
          <th>.</th>
          <th>.</th>
          <th>.</th>
          <th>.</th>
        </tr>
      </thead>
      <tbody>
        {Array(10)
          .fill("")
          .map((e, index) => (
            <tr key={index}>
              <td>
                <div className="h-2 w-16 bg-gray-100"></div>
                <div className="my-2 h-2 w-32 bg-gray-100"></div>
                <div className="h-2 w-64 bg-gray-100"></div>
              </td>
              <td>
                <div className="h-2 w-16 bg-gray-100"></div>
                <div className="my-2 h-2 w-32 bg-gray-100"></div>
                <div className="h-2 w-64 bg-gray-100"></div>
              </td>
              <td>
                <div className="h-2 w-16 bg-gray-100"></div>
                <div className="my-2 h-2 w-32 bg-gray-100"></div>
                <div className="h-2 w-64 bg-gray-100"></div>
              </td>
              <td>
                <div className="h-2 w-16 bg-gray-100"></div>
                <div className="my-2 h-2 w-32 bg-gray-100"></div>
                <div className="h-2 w-64 bg-gray-100"></div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TableShimmer;
