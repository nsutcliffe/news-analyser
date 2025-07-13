import { DataGrid, gridClasses } from "@mui/x-data-grid";
import type { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";

interface SummaryTableProps {
  rows: GridValidRowModel[];
  loading?: boolean;
}
function SummaryTable({ rows, loading }: SummaryTableProps) {
  const ODD_OPACITY = 0.2;

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[200],
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
      "&.Mui-selected": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity
        ),
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
          },
        },
      },
      ...theme.applyStyles("dark", {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    "& .MuiDataGrid-cell": {
      whiteSpace: "normal",
      wordWrap: "break-word",
      lineHeight: "1.2",
    },
  }));

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 300 },
    { field: "sentiment", headerName: "Sentiment", width: 150 },
    { field: "summary", headerName: "Summary", width: 500 },
    { field: "url", headerName: "Link to Source", width: 300 },
  ];

  //   const rows: GridRowsProp = [
  //     {
  //       id: 1,
  //       title: "Data Grid",
  //       sentiment: "the Community version",
  //       summary: "Some summary",
  //       url: "http://www.google.com",
  //     },
  //     { id: 2, title: "Data Grid Pro", sentiment: "the Pro version" },
  //     { id: 3, title: "Data Grid Premium", sentiment: "the Premium version" },
  //   ];

  return (
    <div style={{ height: 800, width: "100%" }}>
      <StripedDataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
      />
    </div>
  );
}

export default SummaryTable;
