import asyncio
import traceback
import json
from mcp.client.streamable_http import streamablehttp_client
from mcp.client.session import ClientSession
import asyncio
import google.generativeai as genai
import webbrowser
from google.genai import types
from google.genai.types import GenerateContentConfig, HttpOptions
import google.genai as genai  
import traceback

model_id = "gemini-2.0-flash"
async def main(query):
    try:
        async with streamablehttp_client("https://mcp.fi.money:8080/mcp/stream") as (
            read_stream,
            write_stream,
            _,
        ):
            print(traceback)
            async with ClientSession(
                read_stream,
                write_stream,
            ) as session:
                
                await session.initialize()
                async def process_query(user_input):
                    """Process a query using Claude and available tools"""
                    
                    #messages = 'Your instruction is: You are a banking assistant. Among the tools mentioned, return the appropriate tool for the question asked by the user return only json format with keys and values with no other text in response . Query:' +user_input
                    model=genai.Client(api_key="AIzaSyD3fSsGeRUReNoGDTpzun5Q3lo45K3mxbo")
                    response = await session.list_tools()
                    
                    available_tools = [{      
                        "name": tool.name,
                        "description": tool.description,
                        "input_schema": tool.inputSchema
                    } for tool in response.tools]
                    messages = 'Your instruction is: You are a banking assistant. Among the tools mentioned, return the appropriate tool for the question asked by the user return only json format with keys and values with no other text in response . Query:' + user_input +'and Available tools are: ' + str(response.tools)
                        # print(available_tools)
                    response = await model.aio.models.generate_content(
                        model=model_id,
                        contents=[{"role": "user", "parts": [{"text": messages}]}
                                ],
                        config=GenerateContentConfig(response_modalities=["TEXT"]) # Example config
                                                                          )
                    for i in range(len(available_tools)):
                            if available_tools[i]["name"] in response.text:
                                tool_name = available_tools[i]["name"]
                

                    result = await session.call_tool(tool_name)
                    my_dict=json.loads(result.content[0].text)
                       
                    for key, value in my_dict.items():
                        if key == "login_url" :
                            
                            webbrowser.open(value)
                            await asyncio.sleep(60)
                    print(tool_name)
                    async def Chatloop(chat_input):
                        messages = 'Your instruction is: You are a banking assistant. Among the tools mentioned, return the appropriate tool for the question asked by the user return only json format with keys and values with no other text in response . Query:' +chat_input +'and Available tools are: ' + str(available_tools)
                        # print(available_tools)
                        
                        response = await model.aio.models.generate_content(
                        model=model_id,
                        contents=[{"role": "user", "parts": [{"text": messages}]}
                                ],
                        config=GenerateContentConfig(response_modalities=["TEXT"]) # Example config
                                                                          )
                        print(response.text)
                        for i in range(len(available_tools)):
                            if available_tools[i]["name"] in response.text:
                                tool_name = available_tools[i]["name"]
                        print(tool_name)

                    
                        # Process response and handle tool calls
                        final_text = []

                        

                        result = await session.call_tool(tool_name)
                        
                        final_text.append(f"[Calling tool {tool_name}]")
                        messages=f"  You are a banking assistant..the user query is {chat_input} after the LLm chose the appropriate tool  which is {tool_name} and the response from the tool is {result}. No Based on the user query asked give me comprehensive answer based on the response from the tool."
                        response = await model.aio.models.generate_content(
                        model=model_id,
                        contents=[{"role": "user", "parts": [{"text": messages}]}
                                ],
                        config=GenerateContentConfig(response_modalities=["TEXT"]) # Example config
                                                                          )
                        

                        final_text.append(response.text)


                        final= "\n".join(final_text)
                        print(final)
                        chat_input=input("can i help you with anything else? click q to quit:")
                        if chat_input.lower() == 'q':
                            await session.complete()
                            print("Exiting...")
                        else:
                            await Chatloop(chat_input)
                            
                    await Chatloop(user_input)
                    

                await process_query(query)
                
                                
    except Exception as e:
        print("❌ Exception Type:", type(e).__name__)
        print("❌ Exception Message:", str(e))
        print("❌ Full Traceback:")
        traceback.print_exc()


if __name__ == "__main__":
    user_input = input("How can BankBros help you today? ")
    asyncio.run(main(user_input))

