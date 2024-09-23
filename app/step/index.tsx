import { View, StyleSheet, Text, ScrollView } from "react-native";
import { colors } from "../../constants/colors";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { Button } from "../../components/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  weight: z.string().min(1, { message: "O peso é obrigatório" }),
  height: z.string().min(1, { message: "A altura é obrigatória" }),
  age: z.string().min(1, { message: "A idade é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export default function Step() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <View style={styles.container}>
      <Header step="Passo 1" title="Vamos começar" />

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Nome:</Text>
        <Input
          name="name"
          control={control}
          placeholder="Nome completo"
          error={errors.name?.message}
          keyboardType="default"
        />

        <Text style={styles.label}>Seu peso atual:</Text>
        <Input
          name="weight"
          control={control}
          placeholder="Ex: 75"
          error={errors.weight?.message}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Altura:</Text>
        <Input
          name="height"
          control={control}
          placeholder="Ex: 1.90"
          error={errors.height?.message}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Idade:</Text>
        <Input
          name="age"
          control={control}
          placeholder="Ex: 24"
          error={errors.age?.message}
          keyboardType="numeric"
        />

        <Button title="Avançar" href="/create" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
  },
});
