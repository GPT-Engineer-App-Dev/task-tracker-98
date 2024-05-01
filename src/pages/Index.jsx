import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        description: "Please enter a task before adding.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={5}>
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        size="lg"
        mb={3}
      />
      <Button onClick={addTask} colorScheme="blue" mb={5}>Add Task</Button>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" alignItems="center">
            <ListIcon
              as={task.isCompleted ? FaCheckCircle : FaCheckCircle}
              color={task.isCompleted ? 'green.500' : 'gray.500'}
              onClick={() => toggleTaskCompletion(task.id)}
              cursor="pointer"
            />
            <Box flex="1" as="span" textDecoration={task.isCompleted ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <IconButton
              icon={<FaTrash />}
              onClick={() => deleteTask(task.id)}
              colorScheme="red"
              aria-label="Delete task"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;