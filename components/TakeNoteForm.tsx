import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native';

type IntegrationButtonsProps = {
  handleSubmit: any
}

function IntegrationButtons({handleSubmit}: IntegrationButtonsProps) {
  const integrations = [{name: 'Zapier', service: 'ZAPIER', id: 6}, {name: 'Asana', service: 'ASANA', id: 7}];
  const createOnSubmit = (integration: typeof integrations[number]) => (data: any) => console.log(integration.name, data)
  return (<View>
    {integrations.map(integration => (
      <Pressable style={styles.button} key={integration.id} onPress={handleSubmit(createOnSubmit(integration))}>
        <Text style={styles.text}>{integration.name}</Text>
      </Pressable>
    ))}
  </View>)
}

export default function TakeNoteForm() {
  const { register, setValue, handleSubmit, control, reset, formState: {errors} } = useForm({
    defaultValues: {
      title: '',
      contents: '',
    }
  });
  if (errors.title) {
    return <pre>
      {JSON.stringify(errors)}
    </pre>
  }
  return (<View>
    <Text>Title</Text>
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value }}) => (
        <TextInput
          style={styles.titleInput}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder="Title"
        />
      )}
      name="title"
      rules={{ required: true }}
    />
    <Text>Contents</Text>
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value }}) => (
        <TextInput
          style={styles.contentsInput}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          multiline={true}
          numberOfLines={4}
          placeholder="Contents"
        />
      )}
      name="contents"
      rules={{ required: true }}
    />
    <IntegrationButtons handleSubmit={handleSubmit} />
  </View>);
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#71eeb8',
    margin: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  titleInput: {
    marginBottom: 8
  },
  contentsInput: {
    marginBottom: 16,
  }
});
