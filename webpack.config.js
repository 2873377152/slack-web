const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 可选，用于清理构建目录
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin"); 

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    main: resolve(__dirname, 'src', 'index.tsx')
  },
  output: {
    filename: "[name].[contenthash].js",
    path: resolve(__dirname, 'dist'),
    publicPath: '/' // 确保这是根路径
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      // 添加别名
      images: resolve(__dirname, 'src/assets/images/'),
      '@': resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于8KB的图片将会被转换为 base64
              name: 'images/[name].[ext]', // 输出文件的路径和名称
            },
          },
        ],
      },
      // 添加用于处理视频文件的加载器规则
      {
        test: /\.(mp4|webm)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'videos/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 可选，用于清理构建目录
    // 设置每次构建之前清理 build 文件夹
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['build'],
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public', 'index.html'),
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      // filename: app.css
    }),
    new CopyPlugin({ // 添加 copy-webpack-plugin 配置
      patterns: [
        {
          from: resolve(__dirname, 'public'), // 复制 public 文件夹中的所有内容
          to: resolve(__dirname, 'dist'), // 复制到打包后的输出目录中
          globOptions: {
            ignore: ["**/index.html"] // 忽略复制 index.html 文件
          }
        }
      ]
    })
  ],
  devServer: {
    port: 7001,
    historyApiFallback: {
      // 用于匹配需要重定向到index.html的路径
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
        { from: /./, to: '/index.html' } // 任何路径都重定向到index.html
      ]
    }
  }
}