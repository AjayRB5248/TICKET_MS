import { m, MotionProps } from "framer-motion";
// @mui
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import Box, { BoxProps } from "@mui/material/Box";

import { MotionContainer, varFade } from "src/components/animate";

export default function FaqsHero() {
  return (
    <Box
      sx={{
        height: { md: 350 },
        py: { xs: 10, md: 0 },
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: "absolute" },
            textAlign: { xs: "center", md: "center" },
            left: { md: 0 },
            right: { md: 0 },
          }}
        >
          <div>
            <Stack
              spacing={2}
              display="inline-flex"
              direction="row"
              justifyContent="center"
              sx={{ color: "common.white" }}
            >
              <TextAnimate text="Are" />
              <TextAnimate text="you" />
              <TextAnimate text="a" />
              <TextAnimate text="User" sx={{ color: "primary.main" }} variants={varFade().inRight} />
              <TextAnimate text="or" />
              <TextAnimate text="a" />
              <TextAnimate text="Company" sx={{ color: "primary.main" }} variants={varFade().inRight} />
              <TextAnimate text="?" />
            </Stack>
          </div>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type TextAnimateProps = BoxProps &
  MotionProps & {
    text: string;
  };

function TextAnimate({ text, variants, sx, ...other }: TextAnimateProps) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: "h1",
        overflow: "hidden",
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    >
      {text.split("").map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}
