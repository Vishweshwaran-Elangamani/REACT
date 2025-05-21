using System;
using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;

interface IOrderService
{
    void CreateOrder(string artworkid, string artistname, string artworkcatagory, string discription);
    void ReadOrders();
    void UpdateOrder(int id, string artworkid, string artistname, string artworkcatagory, string discription);
    void DeleteOrder(int id);
    void SearchOrder(string artworkid);
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
        var cmd = new MySqlCommand("INSERT INTO orders (artwork_id, artist_name, artwork_catagory, discription) VALUES (@artworkid, @artistname, @artworkcatagory, @discription)", conn);
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
            Console.WriteLine($"ID: {reader["id"]}, Artwork ID: {reader["artwork_id"]}, Artist Name: {reader["artist_name"]}, Artwork Catagory: {reader["artwork_catagory"]}, Discription: {reader["discription"]}");
        }
    }

    public void UpdateOrder(int id, string artworkid, string artistname, string artworkcatagory, string discription)
    {
        using var conn = new MySqlConnection(connStr);
        conn.Open();
        var cmd = new MySqlCommand("UPDATE orders SET artwork_id=@artworkid, artist_name=@artistname, artwork_catagory=@artworkcatagory, discription=@discription WHERE id=@id", conn);
        cmd.Parameters.AddWithValue("@id", id);
        cmd.Parameters.AddWithValue("@artworkid", artworkid);
        cmd.Parameters.AddWithValue("@artistname", artistname);
        cmd.Parameters.AddWithValue("@artworkcatagory", artworkcatagory);
        cmd.Parameters.AddWithValue("@discription", discription);
        cmd.ExecuteNonQuery();
        Console.WriteLine("Artwork updated.");
    }

    public void SearchOrder(string artworkid)
    {
        using var conn = new MySqlConnection(connStr);
        conn.Open();
        var cmd = new MySqlCommand("SELECT * FROM orders WHERE artwork_id=@artworkid", conn);
        cmd.Parameters.AddWithValue("@artworkid", artworkid);
        using var reader = cmd.ExecuteReader();
        if (reader.Read())
        {
            Console.WriteLine($"Artwork ID: {reader["artwork_id"]}, Artist Name: {reader["artist_name"]}, Artwork Catagory: {reader["artwork_catagory"]}, Discription: {reader["discription"]}");
        }
        else
        {
            Console.WriteLine("No artwork found with the given ID.");
        }
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
        var orderService = new OrderService("server=localhost;user=root;password=test;database=artworkdb;");

        while (true)
        {
            Console.WriteLine("\nChoose an operation:");
            Console.WriteLine("1. Create artwork");
            Console.WriteLine("2. Read artworks");
            Console.WriteLine("3. Update artwork");
            Console.WriteLine("4. Delete artwork");
            Console.WriteLine("5. Search artwork");
            Console.WriteLine("6. Exit");
            Console.Write("Enter choice: ");
            var choice = Console.ReadLine();

            switch (choice)
            {
                case "1":
                    Console.Write("Enter Artwork ID: ");
                    string artworkid = Console.ReadLine();
                    Console.Write("Enter Artist Name: ");
                    string artistname = Console.ReadLine();
                    Console.Write("Enter Artwork Category: ");
                    string artworkcatagory = Console.ReadLine();
                    Console.Write("Enter Artwork Description: ");
                    string discription = Console.ReadLine();
                    try
                    {
                        orderService.CreateOrder(artworkid, artistname, artworkcatagory, discription);
                    }
                    catch (Exception ex)
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
                    catch (Exception ex)
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
                    Console.Write("Enter new Artwork ID: ");
                    string newArtworkid = Console.ReadLine();
                    Console.Write("Enter new Artist Name: ");
                    string newArtistname = Console.ReadLine();
                    Console.Write("Enter new Artwork Category: ");
                    string newArtworkcatagory = Console.ReadLine();
                    Console.Write("Enter new Artwork Description: ");
                    string newDiscription = Console.ReadLine();
                    Console.WriteLine("Are you sure you want to update this Artwork? (y/n)");
                    var confirm = Console.ReadLine();
                    if (confirm.ToLower() == "y")
                    {
                        try
                        {
                            orderService.UpdateOrder(updateId, newArtworkid, newArtistname, newArtworkcatagory, newDiscription);
                            Console.WriteLine("Artwork updated successfully.");
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine("Unhandled exception.");
                            Console.WriteLine(ex.Message);
                            Console.WriteLine("Stack trace:");
                            Console.WriteLine(ex.StackTrace);
                        }
                    }
                    else
                    {
                        Console.WriteLine("Artwork not updated.");
                    }
                    break;

                case "4":
                    Console.Write("Enter Artwork ID to delete: ");
                    int deleteId = int.Parse(Console.ReadLine());
                    Console.WriteLine("Are you sure you want to delete this Artwork? (y/n)");
                    var confirmDelete = Console.ReadLine();
                    if (confirmDelete.ToLower() == "y")
                    {
                        try
                        {
                            orderService.DeleteOrder(deleteId);
                            Console.WriteLine("Artwork deleted.");
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine("Unhandled exception.");
                            Console.WriteLine(ex.Message);
                            Console.WriteLine("Stack trace:");
                            Console.WriteLine(ex.StackTrace);
                        }
                    }
                    else
                    {
                        Console.WriteLine("Artwork not deleted.");
                    }
                    break;

                case "5":
                    Console.Write("Enter the Artwork ID you want to search: ");
                    string search = Console.ReadLine();
                    try
                    {
                        orderService.SearchOrder(search);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Unhandled exception.");
                        Console.WriteLine(ex.Message);
                        Console.WriteLine("Stack trace:");
                        Console.WriteLine(ex.StackTrace);
                    }
                    break;

                case "6":
                    return;

                default:
                    Console.WriteLine("Invalid choice.");
                    break;
            }
        }
    }
}

