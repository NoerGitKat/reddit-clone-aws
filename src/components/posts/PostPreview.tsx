import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { formatDate } from "../../utils/dates";

export interface IPostPreviewProps {
  owner: string;
  title: string;
  createdAt: string;
}

const PostPreview = ({ title, owner, createdAt }: IPostPreviewProps) => {
  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: "75%", margin: "0 auto", padding: "1rem" }}
    >
      <Grid container direction="row" spacing={3}>
        <Grid item alignItems="center">
          <Grid item>
            <IconButton color="inherit" size="medium">
              <ArrowUpwardIcon />
            </IconButton>
          </Grid>
          <Grid item>votes</Grid>
          <Grid item>
            <IconButton color="inherit" size="medium">
              <ArrowDownwardIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="subtitle2" component="h2">
                Posted by <b>{owner}</b> at{" "}
                <i>{formatDate(createdAt, "LLLL")}</i>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" component="h1">
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="p">
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PostPreview;
