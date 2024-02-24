import AddIcon from '@mui/icons-material/Add';
import CustomTooltip from "../../../components/CustomTooltip";
import ServerButton from "../../../components/ServerButton";

const NavigationAction = () => {
  return (
    <div>
        <CustomTooltip title="Add a new server">
            <ServerButton>
                <AddIcon color="primary" fontSize="medium" sx={{ "&:hover": { color: "white" } }}/>
            </ServerButton>
        </CustomTooltip>
    </div>
  )
}

export default NavigationAction