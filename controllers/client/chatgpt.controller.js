const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");

// [GET] /chat-gpt
module.exports.index = (req, res) => {
  res.render("client/pages/chatgpt/index", {
    pageTile: "CHAT GPT",
  });
};

// [POST] /chat-gpt
module.exports.post = async (req, res) => {
  try {
    const products = await Product.find({
      deleted: false,
      status: "active",
    }).select("title price sold discountPercentage");

    const newProducts = productHelper.priceNewProducts(products);

    const productInfo = newProducts
      .map(
        (p, i) =>
          `${i + 1}. ${p.title} - ${p.newPrice} VNĐ - (${p.sold})\nMô tả: ${
            p.description
          }`
      )
      .join("\n\n");

    const prompt = req.body.prompt;

    const systemMessage = `
      Bạn là chatbot tư vấn sản phẩm cho website thương mại điện tử về bán đồng hồ.
      Dưới đây là danh sách sản phẩm hiện có:
      ${productInfo}

      Nếu người dùng hỏi về sản phẩm, hãy dựa vào danh sách trên để trả lời chính xác.
      Nếu không có sản phẩm phù hợp, hãy nói lịch sự rằng hiện tại shop chưa có sản phẩm đó.
      Nếu người dùng hỏi các câu hỏi khác không liên quan đến sản phẩm, hãy trả lời ngắn gọn và lịch sự về chủ đề đó.
    `;

    const response = await _openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
    });

    res.status(200).send({
      bot: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
};
