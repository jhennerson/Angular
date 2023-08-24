package com.reservacliente.controllersTest;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reservacliente.controllers.ClienteController;
import com.reservacliente.models.Cliente;
import com.reservacliente.repositories.ClienteRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import java.util.ArrayList;
import java.util.List;

@ExtendWith(SpringExtension.class)
@WebMvcTest(ClienteController.class)
public class ClienteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteController clienteController;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateCliente() throws Exception {
        // Crie um objeto Cliente para ser usado no teste
        Cliente cliente = new Cliente();
        cliente.setId(1L);
        cliente.setNome("Guilherme");
        cliente.setEmail("guigo@microsoft.com");
        cliente.setTelefone("123456789");

        // Configure o comportamento do clienteRepository.save()
        when(clienteRepository.save(any())).thenReturn(cliente);

        // Faça uma requisição POST para o endpoint de criação de clientes
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/clientes")
                        .content(objectMapper.writeValueAsString(cliente))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    public void testListClientes() throws Exception {
        // Crie uma lista de clientes simulada para o teste
        List<Cliente> clientes = new ArrayList<>();
        Cliente cliente1 = new Cliente();
        cliente1.setId(1L);
        cliente1.setNome("Flavio");
        cliente1.setEmail("flavio47@yahoo.com");
        cliente1.setTelefone("111111111");

        Cliente cliente2 = new Cliente();
        cliente2.setId(2L);
        cliente2.setNome("Juarez");
        cliente2.setEmail("Juarez14@gmail.com");
        cliente2.setTelefone("222222222");

        clientes.add(cliente1);
        clientes.add(cliente2);

        // Configure o comportamento do clienteRepository.findAll()
        when(clienteRepository.findAll()).thenReturn(clientes);

        // Faça uma requisição GET para o endpoint de listagem de clientes
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/clientes")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(clientes)));

    }
    @Test
    public void testUpdateCliente() throws Exception {
        // Crie um objeto Cliente para ser usado no teste
        Cliente cliente = new Cliente();
        cliente.setId(1L);
        cliente.setNome("Jeremias");
        cliente.setEmail("jerimias12@outlook.com");
        cliente.setTelefone("987654321");

        // Configure o comportamento do clienteRepository.findById() e clienteRepository.save()
        when(clienteRepository.findById(1L)).thenReturn(java.util.Optional.of(cliente));
        when(clienteRepository.save(any())).thenReturn(cliente);

        // Faça uma requisição PUT para o endpoint de atualização de cliente
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/clientes/1")
                        .content(objectMapper.writeValueAsString(cliente))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(cliente)));
    }
    @Test
    public void testDeleteCliente() throws Exception {
        // Configure o comportamento do clienteRepository.findById() e clienteRepository.deleteById()
        when(clienteRepository.findById(1L)).thenReturn(java.util.Optional.of(new Cliente()));

        // Faça uma requisição DELETE para o endpoint de exclusão de cliente
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/api/clientes/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
}
