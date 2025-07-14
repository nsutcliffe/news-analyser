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
    "& .MuiDataGrid-columnHeaders": {
      fontWeight: "bold",
      fontSize: "1.1rem",
    },
  }));

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 3 },
    { field: "sentiment", headerName: "Sentiment", flex: 1 },
    { field: "summary", headerName: "Summary", flex: 4 },
    {
      field: "url",
      headerName: "Link to Source",
      flex: 3,
      renderCell: (params) => (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          style={{ wordBreak: "break-all" }}
        >
          {params.value}
        </a>
      ),
    },
  ];

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
