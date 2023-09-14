import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import DisplaySelection from "../../components/DisplaySelection";
import Breadcrumb from "../../components/Breadcumb";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { handleError, showSuccessMessage } from "../../utils";
import Loading from "../../components/Loading";
import LoadingButton from '@mui/lab/LoadingButton';
import CampaignForm from "./CampaignForm";
import { useFetchAllProvidersQuery } from "./slice/providerApiSlice";
import { useAddCampaignMutation, useFetchCampaignQuery, useUpdateCampaignMutation } from "./slice/campaignApiSlice";

const NewCampaign = ({ createNew }) => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const defaultProducer = { name: '', description: '' };

  const [campaign, setCampaign] = React.useState({});

  // selectedRows - display rows
  const [selectedProducer, setSelectedProducer] = React.useState(defaultProducer);

  // values for select box
  const [providers, setProviders] = React.useState([]);

  // fetch campaign by id
  const {
    data: campaignData,
    isError: isFetchCampaignError,
    error: fetchCampaignError
  } = useFetchCampaignQuery(campaignId, { skip: createNew });

  React.useEffect(() => {
    const campaignResult = campaignData?.result;
    setCampaign(campaignResult);
    setSelectedProducer(campaignResult?.producer);
  }, [campaignData]);

  if (isFetchCampaignError) {
    handleError(fetchCampaignError, "Cannot fetch the campaign!");
  }

  // fetch all providers
  const {
    data: providerData,
    isError: isFetchAllProvidersError,
    error: fetchAllProvidersError
  } = useFetchAllProvidersQuery();

  React.useEffect(() => {
    setProviders(providerData?.results);
  }, [providerData]);

  if (isFetchAllProvidersError) {
    handleError(fetchAllProvidersError, "Cannot fetch providers!");
  }

  // mutation api
  const [addCampaign, { isLoading: isAdding }] = useAddCampaignMutation();
  const [updateCampaign, { isLoading: isUpdating }] = useUpdateCampaignMutation();

  // call api create/update movie
  const hanleCampaignSave = async () => {
    const campaignPayload = {
      ...campaign,
      providerId: selectedProducer?.id,
    }

    console.log(campaignPayload);

    if (createNew) {
      try {
        await addCampaign(campaignPayload).unwrap();
        showSuccessMessage("Campaign created successfully!");
        navigate("/admin/campaign", { replace: true });
      } catch (error) {
        handleError(error);
      }
    } else {
      try {
        await updateCampaign({ id: campaign.id, payload: campaignPayload }).unwrap();
        showSuccessMessage("Campaign updated successfully!");
      } catch (error) {
        handleError(error);
      }
    }
  }


  if (!providers) {
    return <Loading />;
  }

  return (
    <Box>
      <Breadcrumb
        links={
          [
            { link: "/admin", title: "Dashboard" },
            { link: "/admin/campaign", title: "Campaign" }
          ]
        }
        currentPage={createNew ? "Create" : "Edit - " + campaign?.name}
        admin
      />

      <CampaignForm campaign={campaign} setCampaign={setCampaign} createNew={createNew} />

      <Divider sx={{ my: 5 }} />

      <Typography variant="h5">Provider</Typography>

      <Box>
        <DisplaySelection
          label="Provider"
          dataRows={providers}
          selectedRow={selectedProducer}
          setSelectedRow={setSelectedProducer}
          manage
          handleManage={() => ({})}
        />
      </Box>

      <LoadingButton
        onClick={hanleCampaignSave}
        variant="contained"
        size="large"
        fullWidth
        startIcon={<CheckCircleIcon />}
        loadingPosition="start"
        loading={isAdding || isUpdating}
        sx={{ mt: 5, py: 2 }}>
        SAVE
      </LoadingButton>
    </Box>
  );
}

export default NewCampaign;