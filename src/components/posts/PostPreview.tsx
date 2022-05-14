import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import * as React from "react";
import { convertNumToStr } from "../../utils";
import { formatTimeFromX } from "../../utils/dates";

export interface IPostPreviewProps {
  owner: string;
  title: string;
  contents: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
}

const PostPreview = ({
  title,
  owner,
  createdAt,
  upvotes,
  downvotes,
  contents,
}: IPostPreviewProps) => {
  return (
    <Paper elevation={3} sx={{ margin: "1rem 0", padding: "1rem" }}>
      <Grid container direction="row" spacing={3}>
        <Grid item alignItems="center">
          <Grid item>
            <IconButton color="inherit" size="medium">
              <ArrowUpwardIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Box display="flex" justifyContent="center">
              <Typography variant="body1">
                {convertNumToStr(upvotes - downvotes)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">votes</Typography>
            </Box>
          </Grid>
          <Grid item>
            <IconButton color="inherit" size="medium">
              <ArrowDownwardIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item sx={{ maxWidth: "70%" }}>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="subtitle2" component="h2">
                Posted by <b>{owner}</b> <i>{formatTimeFromX(createdAt)}</i>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" component="h1">
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="p">
                {contents}
              </Typography>
            </Grid>
            {true && (
              <Grid item>
                <Image
                  src="https://dygtyjqp7pi0m.cloudfront.net/i/7919/9687164_2.jpg"
                  height={200}
                  width={200}
                  layout="intrinsic"
                  alt={`Post "${title}" Image`}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PostPreview;
