import base64


user_input = "The pie charts show the amount of revenue and expenditures in 2016 for a children’s charity in the USA. Overall, it can be seen that donated food accounted for the majority of the income, while program services accounted for the most expenditure. Total revenue sources just exceeded outgoings. In detail, donated food provided most of the revenue for the charity, at 86%. Similarly, with regard to expenditures, one category, program services, accounted for nearly all of the outgoings, at 95.8%. The other categories were much smaller. Community contributions, which were the second largest revenue source, brought in 10.4% of overall income, and this was followed by program revenue, at 2.2%. Investment income, government grants, and other income were very small sources of revenue, accounting for only 0.8% combined. There were only two other expenditure items, fundraising and management and general, accounting for 2.6% and 1.6% respectively. The total amount of income was $53,561,580, which was just enough to cover the expenditures of $53,224,896."
system_input =( "Please review and mark the following IELTS Task 1 essay. "
            "As an examiner, you will assess IELTS Task 1 essays using the 4 criteria below. "
            "Each criterion is worth 25 percent of the total marks for task 1. "
            "You should give a band score for each criterion and then a total score for the task. "
            "Task Response, Coherence and Cohesion, Lexical Resource (Vocabulary), Grammatical Range & Accuracy. "
            "Essay scores should be within the range of 0 to 9, 0 being the minimum, and 9 being the maximum"
            "Essay should be written based on the photo attached and should explain what is in the photo."
            "In order to get the maximum score, reader should be able to imagine what is in the photo by just reading the Essay"
            "Then provide detailed feedback for it. Point out mistakes and suggest ways to improve."
            "For IELTS TASK 2 also evaluate like the above criteria. "
        )

# Function to encode the image
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


# Path to your image
image_path = "media/mocktests/writing-task-1.jpg"

# Getting the base64 string
base64_image = encode_image(image_path)