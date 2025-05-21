using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
 
interface IOrderService
{
    void CreateOrder(string artworkid, string artistname, string artworkcatagory, string discription);
    void ReadOrders();
    void UpdateOrder(int id, string artworkid, string artistname, string artworkcatagory, string discription);
    void DeleteOrder(int id);
}

class OrderService : IOrderService
{
    private readonly string connStr;
 
    public OrderService(string connStr)
    {
        this.connStr = connStr;
    }
 
    public void CreateOrder(string artworkid, string artistname, string artworkcatagory, string discription)
    {
        using var conn = new MySqlConnection(connStr);
        conn.Open();
        var cmd = new MySqlCommand("INSERT INTO orders (artworkid, artistname, artworkcatagory, discription) VALUES (@artworkid, @artistname, @artworkcatagory, @discription)", conn);
        cmd.Parameters.AddWithValue("@artworkid", artworkid);
        cmd.Parameters.AddWithValue("@artistname", artistname);
        cmd.Parameters.AddWithValue("@artworkcatagory", artworkcatagory);
        cmd.Parameters.AddWithValue("@discription", discription);
        cmd.ExecuteNonQuery();
        Console.WriteLine("Artwork created.");
    }
 
    public void ReadOrders()
    {
        using var conn = new MySqlConnection(connStr);
        conn.Open();
        var cmd = new MySqlCommand("SELECT * FROM orders", conn);
        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            Console.WriteLine($"ID: {reader["id"]}, Artwork ID: {reader["artworkid"]}, Artist Name: {reader["artistname"]}, Artwork Catagory: {reader["artworkcatagory"]}, Discription: {reader["discription"]}");
        }
    }
 
    public void UpdateOrder(int id, string artworkid, string artistname, string artworkcatagory, string discription)
    {
        using var conn = new MySqlConnection(connStr);
        conn.Open();
        var cmd = new MySqlCommand("UPDATE orders SET artworkid=@artworkid, artistname=@artistname, artworkcatagory=@artworkcatagory, discription=@discription WHERE id=@id", conn);
        cmd.Parameters.AddWithValue("@id", id);
        cmd.Parameters.AddWithValue("@artworkid", artworkid);
        cmd.Parameters.AddWithValue("@artistname", artistname);
        cmd.Parameters.AddWithValue("@artworkcatagory", artworkcatagory);
        cmd.Parameters.AddWithValue("@discription", discription);
        cmd.ExecuteNonQuery();
        Console.WriteLine("Artwork updated.");
    }
 
    public void DeleteOrder(int id)
    {
        using var conn = new MySqlConnection(connStr);
        conn.Open();
        var cmd = new MySqlCommand("DELETE FROM orders WHERE id=@id", conn);
        cmd.Parameters.AddWithValue("@id", id);
        cmd.ExecuteNonQuery();
        Console.WriteLine("Artwork deleted.");
    }
}

class Program
{
    static void Main()
    {
        var orderService = new OrderService("server=localhost;user=root;password=test;database=artwork;");
 
        while (true)
        {
            Console.WriteLine("\nChoose an operation:");
            Console.WriteLine("1. Create artwork");
            Console.WriteLine("2. Read artwork");
            Console.WriteLine("3. Update artwork");
            Console.WriteLine("4. Delete artwork");
            Console.WriteLine("5. Exit");
            Console.Write("Enter choice: ");
            var choice = Console.ReadLine();
 
            switch (choice)
            {
                case "1":
                    Console.Write("Enter Artwork id: ");
                    string artworkid = Console.ReadLine();
                    Console.Write("Enter Artist name: ");
                    string artistname = Console.ReadLine();
                    Console.Write("Enter Artwork catagory: ");
                    string artworkcatagory = Console.ReadLine();
                    Console.Write("Enter Artwork discription: ");
                    string discription = Console.ReadLine();
                    try
                    {
                        orderService.CreateOrder(artworkid, artistname, artworkcatagory, discription);
                    }
                    catch (MySqlException ex)
                    {
                        Console.WriteLine("Unhandled exception.");
                        Console.WriteLine(ex.Message);
                        Console.WriteLine("Stack trace:");
                        Console.WriteLine(ex.StackTrace);
                    }
                    break;
 
                case "2":
                    try
                    {
                        orderService.ReadOrders();
                    }
                    catch (MySqlException ex)
                    {
                        Console.WriteLine("Unhandled exception.");
                        Console.WriteLine(ex.Message);
                        Console.WriteLine("Stack trace:");
                        Console.WriteLine(ex.StackTrace);
                    }
                    break;
 
                case "3":
                    Console.Write("Enter Artwork ID to update: ");
                    int updateId = int.Parse(Console.ReadLine());
                    Console.Write("Enter new Artwork id: ");
                    string newArtworkid = Console.ReadLine();
                    Console.Write("Enter new Artist name: ");
                    string newArtistname = Console.ReadLine();
                    Console.Write("Enter new Artwork Catagory: ");
                    string newArtworkcatagory = Console.ReadLine();
                    Console.Write("Enter new Artwork discription: ");
                    string newDiscription = Console.ReadLine();
                    Console.WriteLine("Are you sure you want to update this Artwork? (y/n)");
                    var confirm = Console.ReadLine();
                    if (confirm.ToLower() == "y")
                    {
                        orderService.UpdateOrder(updateId, newArtworkid, newArtistname, newArtworkcatagory, newDiscription);
                        Console.WriteLine("Artwork updated successfully.");
                    }
                    else
                    {
                        Console.WriteLine("Artwork not updated.");
                    }
                    try
                    {
                        orderService.UpdateOrder(updateId, newArtworkid, newArtistname, newArtworkcatagory, newDiscription);
                    }
                    catch (MySqlException ex)
                    {
                        Console.WriteLine("Unhandled exception.");
                        Console.WriteLine(ex.Message);
                        Console.WriteLine("Stack trace:");
                        Console.WriteLine(ex.StackTrace);
                    }
                    break;
 
                case "4":
                    Console.Write("Enter ArtWork ID to delete: ");
                    int deleteId = int.Parse(Console.ReadLine());
                    Console.WriteLine("Are you sure you want to delete this ArtWork? (y/n)");
                    var confirmDelete = Console.ReadLine();
                    if (confirmDelete.ToLower() == "y")
                    {
                        orderService.DeleteOrder(deleteId);
                        Console.WriteLine("ArtWork deleted.");
                    }
                    else
                    {
                        Console.WriteLine("ArtWork not deleted.");
                    }
                    try
                    {
                        orderService.DeleteOrder(deleteId);
                    }
                    catch (MySqlException ex)
                    {
                        Console.WriteLine("Unhandled exception.");
                        Console.WriteLine(ex.Message);
                        Console.WriteLine("Stack trace:");
                        Console.WriteLine(ex.StackTrace);
                    }
                    break;
 
                case "5":
                    return;
 
                default:
                    Console.WriteLine("Invalid choice.");
                    break;
            }
        }
    }
}

