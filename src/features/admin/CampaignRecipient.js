import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useFetchAllCampaignRecipientsQuery } from './slice/campaignApiSlice';

const columns = [
  { field: 'no', headerName: 'NO', width: 10 },
  { field: 'recipientId', headerName: 'Recipient', width: 200 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'queueDate', headerName: 'Queue Date', width: 200 },
  { field: 'sendDate', headerName: 'Send Date', width: 200 },
  {
    field: 'retry',
    headerName: 'Retry',
    type: 'number',
    width: 50,
  },
];

export default function CampaignRecipient({campaignId}) {
  const {data: recipientData} = useFetchAllCampaignRecipientsQuery(campaignId);

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (recipientData) {
      const recipients = recipientData?.results?.slice().map((recipient, index) => ({ ...recipient, no: index + 1 }));
      setRows(recipients);
    }
  }, [recipientData]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}