"""
LLM Client - CAPA 1: NÚCLEO LOCAL
Cliente para LLM local (Ollama)
"""

import httpx
from typing import Optional, Dict, Any, List
from loguru import logger

from config import settings, get_llm_config, SYSTEM_PROMPTS


class LLMClient:
    """
    Cliente para interactuar con el LLM local (Ollama)
    Llama 3 / Mistral corriendo en localhost:11434
    """
    
    def __init__(self):
        self.config = get_llm_config()
        self.base_url = self.config["base_url"]
        self.model = self.config["model"]
        self.temperature = self.config["temperature"]
        self.max_tokens = self.config["max_tokens"]
        self._client = httpx.Client(timeout=60.0)
        
        self._test_connection()
    
    def _test_connection(self):
        """Verifica que Ollama esté corriendo"""
        try:
            response = self._client.get(f"{self.base_url}/api/tags")
            if response.status_code == 200:
                models = response.json().get("models", [])
                model_names = [m["name"] for m in models]
                
                if self.model.split(":")[0] in " ".join(model_names):
                    logger.info(f"✅ LLM client connected: {self.model} @ {self.base_url}")
                else:
                    logger.warning(f"⚠️ Model {self.model} not found. Available: {model_names}")
            else:
                logger.error(f"❌ Ollama server returned {response.status_code}")
        except Exception as e:
            logger.error(f"❌ Failed to connect to Ollama: {e}")
            logger.error("Make sure Ollama is running: ollama serve")
    
    def generate(
        self, 
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None
    ) -> str:
        """
        Genera respuesta del LLM
        
        Args:
            prompt: Prompt del usuario
            system_prompt: Prompt del sistema (opcional)
            temperature: Temperatura (opcional, usa default si no se especifica)
            max_tokens: Max tokens (opcional)
        
        Returns:
            str: Respuesta del LLM
        """
        try:
            payload = {
                "model": self.model,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": temperature or self.temperature,
                    "num_predict": max_tokens or self.max_tokens
                }
            }
            
            if system_prompt:
                payload["system"] = system_prompt
            
            response = self._client.post(
                f"{self.base_url}/api/generate",
                json=payload
            )
            
            if response.status_code == 200:
                result = response.json()
                return result.get("response", "").strip()
            else:
                logger.error(f"LLM generation failed: {response.status_code}")
                return ""
                
        except Exception as e:
            logger.error(f"LLM generation error: {e}")
            return ""
    
    def generate_sql(
        self, 
        natural_language_query: str,
        schema_context: Optional[str] = None
    ) -> str:
        """
        Genera SQL a partir de lenguaje natural
        
        Args:
            natural_language_query: Pregunta en lenguaje natural
            schema_context: Esquema de la base de datos (opcional)
        
        Returns:
            str: Query SQL generado
        """
        prompt = f"""Pregunta: {natural_language_query}

Esquema de la base de datos:
{schema_context or "[Schema will be provided]"}

Genera la consulta SQL:"""
        
        sql = self.generate(
            prompt=prompt,
            system_prompt=SYSTEM_PROMPTS["sql_generator"],
            temperature=0.1  # Muy baja para SQL preciso
        )
        
        # Limpiar el SQL (remover markdown si existe)
        sql = sql.replace("```sql", "").replace("```", "").strip()
        
        logger.info(f"Generated SQL for: {natural_language_query[:50]}...")
        logger.debug(f"SQL: {sql}")
        
        return sql
    
    def validate_query(self, sql_query: str, schema_context: str) -> Dict[str, Any]:
        """
        Valida una consulta SQL antes de ejecutarla
        
        Args:
            sql_query: Query SQL a validar
            schema_context: Esquema de la BBDD
        
        Returns:
            Dict: Resultado de validación con formato:
                {
                    "valid": bool,
                    "issues": List[str],
                    "risk_level": str,
                    "estimated_rows": int
                }
        """
        prompt = f"""Valida esta consulta SQL:

SQL:
{sql_query}

Esquema:
{schema_context}

Responde en formato JSON estricto."""
        
        response = self.generate(
            prompt=prompt,
            system_prompt=SYSTEM_PROMPTS["query_validator"],
            temperature=0.0
        )
        
        try:
            # Intentar parsear JSON
            import json
            result = json.loads(response)
            logger.debug(f"Query validation: {result}")
            return result
        except json.JSONDecodeError:
            logger.warning("LLM did not return valid JSON, using default")
            return {
                "valid": False,
                "issues": ["Failed to validate - invalid LLM response"],
                "risk_level": "high",
                "estimated_rows": 0
            }
    
    def generate_insights(
        self, 
        data: Dict[str, Any],
        context: str
    ) -> str:
        """
        Genera insights de negocio a partir de datos analíticos
        
        Args:
            data: Datos analíticos
            context: Contexto del análisis
        
        Returns:
            str: Insights generados
        """
        import json
        
        prompt = f"""Contexto: {context}

Datos:
{json.dumps(data, indent=2, ensure_ascii=False)}

Genera insights accionables:"""
        
        insights = self.generate(
            prompt=prompt,
            system_prompt=SYSTEM_PROMPTS["insight_generator"],
            temperature=0.3  # Algo de creatividad
        )
        
        return insights
    
    def close(self):
        """Cierra el cliente HTTP"""
        self._client.close()


# Singleton instance
llm = LLMClient()
