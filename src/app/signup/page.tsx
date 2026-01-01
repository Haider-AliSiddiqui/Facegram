"use client";

import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Stack,
  Grid,
  Center,
} from "@mantine/core";
import { useForm, isEmail } from "@mantine/form";
import { useDispatch } from "react-redux";
import { signUpUser } from "@/redux/actions/auth-actions/auth-actions";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import  Lottie  from "lottie-react";
import loginAnimation from "../../assests/Login.json";

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      name: (v) => (v.length < 3 ? "Name too short" : null),
      email: isEmail("Invalid email"),
      password: (v) =>
        v.length < 6 ? "Password must be 6+ characters" : null,
    },
  });

  const submitHandler = (values: typeof form.values) => {
    setLoading(true);
    dispatch(signUpUser(values)).finally(() => {
      setLoading(false);
      form.reset();
    });
  };

  return (
  <Grid h="100vh" align="stretch">

    {/* ⬅️ LEFT: LOTTIE */}
    <Grid.Col span={{ base: 0, md: 6 }} visibleFrom="md">
      <Center style={{ height: "100vh" }}>
        <Lottie
          animationData={loginAnimation}
          loop
          style={{ width: 350 }}
        />
      </Center>
    </Grid.Col>

    {/* ➡️ RIGHT: FORM */}
    <Grid.Col span={{ base: 12, md: 6 }}>
      <Center style={{ height: "100vh" }}>
        <Paper shadow="md" p="xl" radius="md" w={380}>
          <Title order={2} ta="center" mb="md">
            Sign Up
          </Title>

          <form onSubmit={form.onSubmit(submitHandler)}>
            <Stack>
              <TextInput
                label="Name"
                placeholder="Your name"
                withAsterisk
                {...form.getInputProps("name")}
              />

              <TextInput
                label="Email"
                placeholder="your@email.com"
                withAsterisk
                {...form.getInputProps("email")}
              />

              <PasswordInput
                label="Password"
                placeholder="••••••"
                withAsterisk
                {...form.getInputProps("password")}
              />

              <Button type="submit" loading={loading} fullWidth>
                Create Account
              </Button>
            </Stack>
          </form>
        </Paper>
      </Center>
    </Grid.Col>

  </Grid>
);
};

export default SignUp;
