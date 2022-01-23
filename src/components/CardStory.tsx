import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

type Props = {
  title: string;
  content: string;
};

const CardStory: React.FC<Props> = ({ title, content }) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {content}
      </CardContent>
    </Card>
  );
};

export default CardStory;
