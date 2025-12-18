"""
QABot CLI - Command Line Interface para testing
"""

import sys
from loguru import logger
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich import print as rprint

# Configure logger
logger.remove()
logger.add(sys.stderr, format="<green>{time:HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan> - <level>{message}</level>")
logger.add("qabot.log", rotation="10 MB")

from core.orchestrator import qabot
from core.schema_knowledge import schema_knowledge


console = Console()


def print_header():
    """Imprime header del QABot"""
    console.print(Panel.fit(
        "[bold cyan]QABot - Quality Assurance & Business Intelligence[/bold cyan]\n"
        "[dim]Hybrid Architecture - Local LLM + GELITE DB[/dim]",
        border_style="bright_cyan"
    ))


def test_basic_connection():
    """Test básico de conectividad"""
    console.print("\n[yellow]Testing basic connectivity...[/yellow]\n")
    
    # Health check
    health = qabot.get_system_health()
    
    table = Table(title="System Health",show_header=True, header_style="bold magenta")
    table.add_column("Component", style="cyan")
    table.add_column("Status", style="green")
    
    table.add_row("Database", health.get("database", "unknown"))
    table.add_row("Schema Loaded", "✅" if health.get("schema_loaded") else "❌")
    table.add_row("Overall Status", health.get("status", "unknown"))
    
    console.print(table)
    
    # Schema stats
    if health.get("schema_loaded"):
        stats = schema_knowledge.get_stats()
        console.print(f"\n[green]Schema Stats:[/green]")
        console.print(f"  • Tables: {stats['total_tables']}")
        console.print(f"  • Columns: {stats['total_columns']}")
        console.print(f"  • Avg columns/table: {stats['avg_columns_per_table']:.1f}")


def test_integrity_check():
    """Ejecuta integrity check"""
    console.print("\n[yellow]Running integrity tests...[/yellow]\n")
    
    results = qabot.run_daily_integrity_check()
    
    # Results table
    table = Table(title="Integrity Test Results", show_header=True, header_style="bold magenta")
    table.add_column("Metric", style="cyan")
    table.add_column("Value", style="green")
    
    table.add_row("Total Tests", str(results.get("total_tests", 0)))
    table.add_row("Passed", f"[green]{results.get('passed', 0)}[/green]")
    table.add_row("Failed", f"[red]{results.get('failed', 0)}[/red]" if results.get('failed', 0) > 0 else "0")
    table.add_row("Warnings", str(results.get("warnings", 0)))
    table.add_row("Critical Issues", f"[bold red]{len(results.get('critical_issues', []))}[/bold red]" if len(results.get('critical_issues', [])) > 0 else "0")
    
    console.print(table)
    
    # Show critical issues if any
    if len(results.get('critical_issues', [])) > 0:
        console.print("\n[bold red]Critical Issues Found:[/bold red]")
        for issue in results['critical_issues']:
            console.print(f"  ❌ {issue.get('test', 'Unknown')}: {issue}")


def test_natural_language_query():
    """Test de query en lenguaje natural"""
    console.print("\n[yellow]Testing natural language query...[/yellow]\n")
    
    test_queries = [
        "¿Cuántos pacientes tenemos en total?",
        "Muestra las últimas 5 citas",
        "¿Cuál es el ingreso total de este mes?"
    ]
    
    console.print("[cyan]Select a test query:[/cyan]")
    for i, query in enumerate(test_queries, 1):
        console.print(f"  {i}. {query}")
    console.print(f"  {len(test_queries) + 1}. Custom query")
    
    choice = input("\nEnter choice (1-4): ").strip()
    
    if choice.isdigit() and 1 <= int(choice) <= len(test_queries):
        query = test_queries[int(choice) - 1]
    elif choice == str(len(test_queries) + 1):
        query = input("Enter your query: ").strip()
    else:
        console.print("[red]Invalid choice[/red]")
        return
    
    console.print(f"\n[cyan]Processing:[/cyan] {query}\n")
    
    # Process query
    result = qabot.process_natural_language_query(query)
    
    # Show results
    console.print(Panel(f"[bold]Status:[/bold] {result['status']}", border_style="green" if result['status'] == 'success' else "red"))
    
    if result.get('sql_generated'):
        console.print(f"\n[cyan]Generated SQL:[/cyan]")
        console.print(Panel(result['sql_generated'], border_style="blue"))
    
    if result.get('validation'):
        console.print(f"\n[cyan]Validation:[/cyan]")
        console.print(f"  • Valid: {result['validation'].get('valid')}")
        console.print(f"  • Risk: {result['validation'].get('risk_level')}")
    
    if result.get('data'):
        console.print(f"\n[cyan]Results:[/cyan] {result.get('row_count', 0)} rows")
        if result['row_count'] > 0 and result['row_count'] <= 10:
            # Show data as table
            table = Table(show_header=True, header_style="bold magenta")
            
            # Add columns
            for col in result['data'][0].keys():
                table.add_column(col)
            
            # Add rows
            for row in result['data'][:10]:
                table.add_row(*[str(v) for v in row.values()])
            
            console.print(table)
        elif result['row_count'] > 10:
            console.print(f"[dim](Showing first row only)[/dim]")
            for k, v in result['data'][0].items():
                console.print(f"  • {k}: {v}")
    
    if result.get('analysis'):
        console.print(f"\n[cyan]AI Analysis:[/cyan]")
        console.print(Panel(result['analysis'], border_style="yellow"))
    
    if result.get('error'):
        console.print(f"\n[red]Error:[/red] {result['error']}")


def main_menu():
    """Menu principal"""
    while True:
        console.print("\n" + "="*60)
        console.print("[bold cyan]QABot - Main Menu[/bold cyan]")
        console.print("="*60)
        console.print("1. Test Connectivity")
        console.print("2. Run Integrity Check")
        console.print("3. Natural Language Query")
        console.print("4. Show Schema Stats")
        console.print("5. Exit")
        console.print("="*60)
        
        choice = input("\nSelect option: ").strip()
        
        if choice == "1":
            test_basic_connection()
        elif choice == "2":
            test_integrity_check()
        elif choice == "3":
            test_natural_language_query()
        elif choice == "4":
            stats = schema_knowledge.get_stats()
            console.print(f"\n[green]Schema Statistics:[/green]")
            console.print(f"  • Total tables: {stats['total_tables']}")
            console.print(f"  • Total columns: {stats['total_columns']}")
            console.print(f"  • Average columns per table: {stats['avg_columns_per_table']:.1f}")
            console.print(f"  • Largest table: {stats['max_columns_table'][1]} ({stats['max_columns_table'][0]} columns)")
        elif choice == "5":
            console.print("\n[yellow]Goodbye![/yellow]\n")
            break
        else:
            console.print("[red]Invalid option[/red]")


if __name__ == "__main__":
    print_header()
    
    try:
        main_menu()
    except KeyboardInterrupt:
        console.print("\n\n[yellow]Interrupted by user[/yellow]\n")
    except Exception as e:
        console.print(f"\n[red]Fatal error:[/red] {e}\n")
        logger.exception("Fatal error in CLI")
